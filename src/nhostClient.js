
import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  subdomain: 'xpffccdhhqrhlmrsphbx',
  region: 'ap-south-1',
});

console.log('🔗 Nhost Client created:', nhost);
console.log('🌍 Auth URL:', nhost.auth.url);
console.log('🗂️  Storage URL:', nhost.storage.url);
console.log('🔧 GraphQL URL:', nhost.graphql.getUrl());

export default nhost;