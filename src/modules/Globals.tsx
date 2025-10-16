import { createDeliveryClient } from '@kontent-ai/delivery-sdk';

export const deliveryClient = createDeliveryClient({
  environmentId: 'cd358952-bd24-0080-a902-0fd831c563a1',
  previewApiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2RjOTA4NDk2ZTU0N2QxOGIyNDYxNTE4OTE4ZjRhNiIsImlhdCI6MTYyMjUyNjAwMiwibmJmIjoxNjIyNTI2MDAyLCJleHAiOjE5NjgxMjYwMDIsInZlciI6IjEuMC4wIiwicHJvamVjdF9pZCI6ImNkMzU4OTUyYmQyNDAwODBhOTAyMGZkODMxYzU2M2ExIiwiYXVkIjoicHJldmlldy5kZWxpdmVyLmtlbnRpY29jbG91ZC5jb20ifQ.VW2cQ7x936eTU5YVt3xESF-DvibIf0gnvdL7CxtW5ec',
  defaultQueryConfig: {
    usePreviewMode: true
  }
});