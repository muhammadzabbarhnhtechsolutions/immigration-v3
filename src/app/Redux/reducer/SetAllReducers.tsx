// redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
// Import your reducers here
import exampleReducer from '../features/EventSlice'; // Example slice
import courseReducer from '../features/CourseSlice'; // Example slice
import forumReducer from '../features/ForumSlice'; // Example slice



const rootReducer = combineReducers({
  example: exampleReducer,
  course: courseReducer,
  forum: forumReducer,


  // Add other reducers here
});

export default rootReducer;