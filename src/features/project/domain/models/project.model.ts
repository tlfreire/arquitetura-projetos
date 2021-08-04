export interface Project {
  uid: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  userUid: string;
}
