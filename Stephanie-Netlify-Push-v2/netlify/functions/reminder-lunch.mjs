import { scheduled } from '../lib/push.mjs';
export default async () => scheduled('lunch');
export const config = { schedule: '0 15 * * *' };
