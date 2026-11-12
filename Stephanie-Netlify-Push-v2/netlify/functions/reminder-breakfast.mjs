import { scheduled } from '../lib/push.mjs';
export default async () => scheduled('breakfast');
export const config = { schedule: '0 10 * * *' };
