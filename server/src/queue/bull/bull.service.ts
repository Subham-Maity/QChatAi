import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { FAILED_PINECONE_QUEUE, PINECONE_QUEUE } from './constant';
import { Job, Queue } from 'bull';
import { PineconeJob } from './types';
@Injectable()
export class BullService {
  private readonly logger = new Logger(BullService.name);
  private readonly pineconeQueue: Queue;
  private readonly pineconeFailedQueue: Queue;

  constructor(
    @InjectQueue(PINECONE_QUEUE) pineconeQueue: Queue,
    @InjectQueue(FAILED_PINECONE_QUEUE) pineconeFailedQueue: Queue,
  ) {
    this.pineconeQueue = pineconeQueue;
    this.pineconeFailedQueue = pineconeFailedQueue;
  }

  async addPineconeJob(jobData: PineconeJob) {
    try {
      const job = await this.pineconeQueue.add('pinecone', jobData, {
        attempts: 3, // Retry the job up to 3 times
        backoff: { type: 'exponential', delay: 10000 }, // Exponential backoff strategy with an initial delay of 10 seconds\
        removeOnComplete: true, // Remove the job from the queue when it completes
        removeOnFail: true, // Remove the job from the queue when it fails
      });
      this.logger.log(`Added Pinecone job ${job.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to add Pinecone job. Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
  async addPineconeJobToFailedQueue(job: Job) {
    try {
      await this.pineconeFailedQueue.add(job.name, job.data);
      this.logger.log(
        `Added Pinecone job ${job.id} to ${FAILED_PINECONE_QUEUE} queue`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to add Pinecone job to failed queue. Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
