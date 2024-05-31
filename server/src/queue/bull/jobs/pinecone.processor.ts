import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueError,
  OnQueueWaiting,
  OnQueueStalled,
  OnQueueProgress,
  OnQueueRemoved,
  OnQueueDrained,
  OnQueueCleaned,
  OnQueueResumed,
  OnQueuePaused,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BullService } from '../bull.service';
import { PINECONE_QUEUE } from '../constant';
import { PineconeService } from '../../../pinecone';
import { PineconeJob } from '../types';
import { PrismaService } from '../../../prisma/prisma.service';

@Processor(PINECONE_QUEUE)
export class PineconeProcessor {
  private readonly logger = new Logger(PineconeProcessor.name);

  constructor(
    private readonly pineconeService: PineconeService,
    private readonly bullService: BullService,
    private readonly prisma: PrismaService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing Pinecone job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.log(
      `Pinecone job ${job.id} has completed. Result: ${JSON.stringify(result)}`,
    );
  }

  @OnQueueFailed()
  async onError(job: Job, error: any) {
    this.logger.error(
      `Pinecone job ${job.id} has failed. Error: ${error.message}`,
      error.stack,
    );
    // Move the failed job to the DLQ
    await this.bullService.addPineconeJobToFailedQueue(job);

    // Update chat status to 'failed'
    await this.prisma.chat.update({
      where: { fileKey: job.data.fileKey },
      data: { status: 'failed' },
    });
  }

  @OnQueueError()
  onQueueError(error: any) {
    this.logger.error('An unexpected queue error occurred:', error);
  }

  @OnQueueWaiting()
  onQueueWaiting(jobId: number) {
    this.logger.log(`Pinecone job ${jobId} is waiting to be processed.`);
  }

  @OnQueueStalled()
  onQueueStalled(job: Job) {
    this.logger.warn(`Pinecone job ${job.id} has been stalled for too long.`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job, progress: number) {
    this.logger.log(`Pinecone job ${job.id} is ${progress}% complete.`);
  }

  @OnQueueRemoved()
  onQueueRemoved(job: Job) {
    this.logger.log(`Pinecone job ${job.id} has been removed from the queue.`);
  }

  @OnQueueDrained()
  onQueueDrained() {
    this.logger.log('The Pinecone queue has been drained and is now empty.');
  }

  @OnQueueCleaned()
  onQueueCleaned(jobs: Job[], failedCount: number) {
    this.logger.log(
      `The Pinecone queue has been cleaned. ${jobs.length} jobs were removed, and ${failedCount} failed jobs were moved to the DLQ.`,
    );
  }

  @OnQueueResumed()
  onQueueResumed(job?: Job) {
    if (job) {
      this.logger.log(`Pinecone job ${job.id} has resumed processing.`);
    } else {
      this.logger.log('The Pinecone queue has been resumed.');
    }
  }

  @OnQueuePaused()
  onQueuePaused(job?: Job) {
    if (job) {
      this.logger.log(`Pinecone job ${job.id} has been paused.`);
    } else {
      this.logger.log('The Pinecone queue has been paused.');
    }
  }

  @Process(PINECONE_QUEUE)
  async handlePineconeJob(job: Job<PineconeJob>) {
    try {
      const { fileKey } = job.data;
      await this.pineconeService.loadS3IntoPinecone(fileKey);
      // Update the chat status to 'created'
      await this.prisma.chat.update({
        where: { fileKey },
        data: { status: 'created' },
      });
      this.logger.log(
        `Pinecone job processed successfully for file ${fileKey}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to process Pinecone job for file ${job.data.fileKey}`,
        error.stack,
      );
      // Update the chat status to 'failed'
      await this.prisma.chat.update({
        where: { fileKey: job.data.fileKey },
        data: { status: 'failed' },
      });
      throw error;
    }
  }
}
