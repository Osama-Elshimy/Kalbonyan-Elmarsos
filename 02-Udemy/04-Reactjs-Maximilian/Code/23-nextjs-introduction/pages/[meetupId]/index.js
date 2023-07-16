import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name='description' content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
				image={props.meetupData.image}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	// client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	// Get meetup id from url params
	const meetupId = context.params.meetupId;

	// fetch data for a single meetup
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetup = await meetupsCollection.findOne({
		_id: new ObjectId(meetupId),
	});

	return {
		props: {
			meetupData: {
				...meetup,
				_id: meetup._id.toString(),
			},
		},
	};
}

export default MeetupDetails;
