import { scheduled } from '../lib/push.mjs';
export default async () => scheduled('water');
export const config = { schedule: '0 18 * * *' };
