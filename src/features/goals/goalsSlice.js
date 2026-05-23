import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('goals');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const defaultGoals = [
  { id: '1', text: 'Morning workout', completed: true },
  { id: '2', text: 'Build the homepage', completed: false },
  { id: '3', text: 'Read a book chapter', completed: false }
];

const initialState = {
  goals: loadState() || defaultGoals,
};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload);
    },
    toggleGoal: (state, action) => {
      const goal = state.goals.find(g => g.id === action.payload);
      if (goal) {
        goal.completed = !goal.completed;
      }
    },
    reorderGoals: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.goals);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.goals = result;
    },
    editGoal: (state, action) => {
      const { id, newText } = action.payload;
      const goal = state.goals.find(g => g.id === id);
      if (goal) {
        goal.text = newText;
      }
    },
  },
});

export const { addGoal, deleteGoal, toggleGoal, reorderGoals, editGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
