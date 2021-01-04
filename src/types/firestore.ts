export type Organization = {
  name: string;
  profilePicture: string;
  id: string;
};

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
  content: string;
  organizers: Organization[];
  thumbnail: string;
};
