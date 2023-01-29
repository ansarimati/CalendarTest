import './App.css';
import Calendar from './Calendar';

function App() {
	return (
		<div className='App'>
			<h1>Calendar</h1>
			<h3>
				Abstract holidays API, Free plan supports only year 2020, So I have disbaled
				year dropdown
			</h3>
			<h5>
				Note: API is taking a bit to respond, have patience UI will update once api respond.
			</h5>
			<h5>
				Hover on holiday list, to see full name of holiday.
			</h5>

			<Calendar />
		</div>
	);
}

export default App;
