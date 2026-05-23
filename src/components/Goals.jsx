import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { addGoal, deleteGoal, toggleGoal, reorderGoals, editGoal } from '../features/goals/goalsSlice';

const Goals = () => {
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const { goals } = useSelector((state) => state.goals);
  const dispatch = useDispatch();

  React.useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addGoal(inputValue.trim()));
      setInputValue('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(reorderGoals({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }));
  };

  const startEdit = (goal) => {
    setEditingId(goal.id);
    setEditValue(goal.text);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      dispatch(editGoal({ id: editingId, newText: editValue.trim() }));
    }
    setEditingId(null);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-shadow-sm">Today's Focus</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What is your main focus for today?"
          className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 px-2 py-2 focus:outline-none focus:border-white transition-colors"
        />
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="goals-list">
          {(provided) => (
            <ul 
              className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {goals.map((goal, index) => (
                <Draggable key={goal.id} draggableId={goal.id} index={index}>
                  {(provided, snapshot) => (
                    <li 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between space-x-3 group bg-black/10 rounded p-2 ${goal.completed ? 'opacity-70' : ''} ${snapshot.isDragging ? 'shadow-lg bg-black/40' : ''}`}
                    >
                      <div className="flex items-start space-x-3 flex-1 min-w-0 pr-2">
                        <input 
                          type="checkbox" 
                          checked={goal.completed}
                          onChange={() => dispatch(toggleGoal(goal.id))}
                          className="w-5 h-5 mt-1 flex-shrink-0 rounded border-white/50 appearance-none border checked:bg-white checked:border-white relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIi8+PC9zdmc+')] before:bg-center before:bg-no-repeat before:opacity-0 checked:before:opacity-100 cursor-pointer transition-all" 
                        />
                        {editingId === goal.id ? (
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={handleEditKeyDown}
                            autoFocus
                            rows={2}
                            className="flex-1 bg-white/20 border-b border-white text-white px-1 py-0.5 outline-none rounded resize-none"
                          />
                        ) : (
                          <span 
                            className={`text-lg break-words whitespace-pre-wrap select-none cursor-text ${goal.completed ? 'line-through' : ''}`} 
                            title={goal.text}
                            onDoubleClick={() => startEdit(goal)}
                          >
                            {goal.text}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                        {editingId !== goal.id && (
                          <button 
                            onClick={() => startEdit(goal)}
                            className="text-white/70 hover:text-white p-1"
                            aria-label="Edit goal"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        )}
                        <button 
                          onClick={() => dispatch(deleteGoal(goal.id))}
                          className="text-white/70 hover:text-red-400 p-1"
                          aria-label="Delete goal"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {goals.length === 0 && (
                <p className="text-center opacity-70 italic py-4">No goals yet. Add one above!</p>
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Goals;
