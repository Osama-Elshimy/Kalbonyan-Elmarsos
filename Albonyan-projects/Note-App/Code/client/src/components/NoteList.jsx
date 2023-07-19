/* eslint-disable react/prop-types */
import NoteItem from './NoteItem';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

import { useTranslation } from 'react-i18next';

import Card from './Card';
const NoteList = () => {
	const { t } = useTranslation();

	const { authFetch, fetchNotes, notes } = useAppContext();
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		fetchNotes();
	}, []);

	useEffect(() => {
		setFilteredNotes(notes);
	}, [notes]);

	const handleToggleNote = async id => {
		try {
			await authFetch.patch(`/notes/${id}/toggle`);

			await fetchNotes();
		} catch (error) {
			console.error('Error toggling todo:', error);
		}
	};

	const handleFilterChange = filter => {
		setFilter(filter);
		switch (filter) {
			case 'all':
				setFilteredNotes(notes);
				break;
			case 'completed':
				setFilteredNotes(notes.filter(note => note.completed));
				break;
			case 'active':
				setFilteredNotes(notes.filter(note => !note.completed));
				break;
			default:
				setFilteredNotes(notes);
				break;
		}
	};

	const clearCompleted = async () => {
		try {
			const completedNoteIds = notes
				.filter(note => note.completed)
				.map(note => note._id);

			await Promise.all(
				completedNoteIds.map(id => authFetch.delete(`/notes/${id}`))
			);

			fetchNotes();
		} catch (error) {
			console.error('Error deleting completed notes:', error);
		}
	};

	const createNote = async content => {
		try {
			const response = await authFetch.post('/notes', { content });
			const { note } = response.data;
			setFilteredNotes(prevNotes => {
				return [note, ...prevNotes];
			});

			await fetchNotes();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteNote = async noteId => {
		try {
			await authFetch.delete(`/notes/${noteId}`);
			setFilteredNotes(prevNotes => {
				return prevNotes.filter(note => note._id !== noteId);
			});

			fetchNotes();
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		const content = e.target.note.value;
		if (content) {
			createNote(content);
			e.target.note.value = '';
		}
	};

	const activeNotesNumber = notes.filter(note => !note.completed).length;

	return (
		<>
			<Card className='card'>
				<form onSubmit={handleSubmit} className='note-form'>
					<input type='text' name='note' placeholder={t('note-placeholder')} />
					<button type='submit' className='btn'>
						{t('add-note')}
					</button>
				</form>
			</Card>
			<Card className='card-note card'>
				{filteredNotes.map(note => {
					return (
						<NoteItem
							key={note.id}
							id={note._id}
							content={note.content}
							completed={note.completed}
							onToggle={handleToggleNote}
							onDelete={deleteNote}
						/>
					);
				})}

				<div className='note-actions'>
					{activeNotesNumber > 0 && (
						<span>
							{activeNotesNumber > 1
								? `${activeNotesNumber}  ${t('kept-notes')} `
								: t('one-single-note')}
						</span>
					)}
					<button
						className={filter === 'all' ? 'active' : ''}
						onClick={() => handleFilterChange('all')}>
						{t('all')}
					</button>
					<button
						className={filter === 'active' ? 'active' : ''}
						onClick={() => handleFilterChange('active')}>
						{t('active')}
					</button>
					<button
						className={filter === 'completed' ? 'active' : ''}
						onClick={() => handleFilterChange('completed')}>
						{t('completed')}
					</button>
					<button onClick={clearCompleted}>{t('clear-completed')}</button>
				</div>
			</Card>
		</>
	);
};

export default NoteList;
