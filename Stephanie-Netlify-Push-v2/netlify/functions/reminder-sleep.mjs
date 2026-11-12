import { scheduled } from '../lib/push.mjs';
export default async () => scheduled('sleep');
export const config = { schedule: '0 3 * * *' };
