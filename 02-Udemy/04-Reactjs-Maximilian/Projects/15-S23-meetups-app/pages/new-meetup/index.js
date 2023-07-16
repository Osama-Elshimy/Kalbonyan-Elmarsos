// our-domain.com/new-meetup
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	const router = useRouter();

	async function addMeetupHandler(enteredMeetupData) {
		try {
			const response = await fetch('/api/new-meetup', {
				method: 'POST',
				body: JSON.stringify(enteredMeetupData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			console.log(data);

			router.push('/');
		} catch (error) {
			console.error(`MY ERROR: ${error}`);
		}
	}

	return (
		<>
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name='description'
					content='Add your own meetups and create amazing networking opportunities.'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />;
		</>
	);
}

export default NewMeetupPage;
