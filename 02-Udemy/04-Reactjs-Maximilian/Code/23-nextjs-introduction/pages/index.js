import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return (
		<>
			<Head>
				<title>Next Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active Next meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API

  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  };
} */

export async function getStaticProps() {
	// fetch data from an API
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
