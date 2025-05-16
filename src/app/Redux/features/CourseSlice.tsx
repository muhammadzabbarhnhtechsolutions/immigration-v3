import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Root {
  status: boolean;
  course_name: string;
  course_description: string;
  course_thumbnail: string;
  data: Daum[];
}

export interface Daum {
  id: string;
  module_title: string;
  module_description: string;
  module_thumbnail: string;
  course_videos: CourseVideo[];
}

export interface CourseVideo {
  id?: string | number | undefined;
  video_title: string;
  video_description: string;
  video_thumbnail: string;
  video_file: string;
}

interface ExampleState {
  courses: Root | null;
  current_video: CourseVideo | null; // Now an object instead of just a string
}

// Correcting the initial state type
const initialState: ExampleState = {
  courses: null,
  current_video: null,  // New state for video URL
};

const exampleSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCoursesdata: (state, action: PayloadAction<Root>) => {
      state.courses = action.payload;
    },
    setVideoUrl: (state, action: PayloadAction<CourseVideo | null>) => {
      state.current_video  = action.payload; // Update video_url state
    },
  },
});

export const { setCoursesdata,setVideoUrl  } = exampleSlice.actions;

export default exampleSlice.reducer;
