import React from 'react';
import { List, Avatar } from 'antd';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Event } from '../../types/firestore';
import firebase from '../../firebase';

function EventList() {
  const { data: events }: { data: Event[] } = useFirestoreCollectionData(useFirestore().collection('events'), {
    idField: 'id',
  });

  const printItem = (item: Event) => {
    const startDate = firebase.firestore.Timestamp.toDate(item.startDate);
    const endDate = firebase.firestore.Timestamp.toDate(item.endDate);

    const avatars = item.organizers.map((organizer) => (
      <div>
        <p style={{ marginTop: 15, paddingTop: 10, borderTop: '1px solid lightgray' }}>מארגנים:</p>
        <span></span>
        <Avatar alt={organizer.name} src={organizer.profilePicture} />
      </div>
    ));

    const content = (
      <div>
        <p>תיאור:</p>
        {item.content}
      </div>
    );

    return (
      <List.Item key={item.id} extra={<img width={272} alt="logo" src={item.thumbnail} />}>
        <List.Item.Meta
          avatar={<Avatar src={item.thumbnail} />}
          title={`${item.title}`}
          description={`${startDate} - ${endDate}`}
        />
        {content}
        {avatars}
      </List.Item>
    );
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      loading={!events}
      dataSource={events}
      renderItem={printItem}
    />
  );
}

export default EventList;
