import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  healthCheck(): string {
    return 'Hello World! - aws health-check msa2 nestjs';
  }

  async getComingSoon() {
    const { data: comingSoonResult } = await axios.get(
      'https://movies-api.nomadcoders.workers.dev/coming-soon',
    );
    console.log(comingSoonResult);
    return { success: true, result: comingSoonResult };
  }
}
