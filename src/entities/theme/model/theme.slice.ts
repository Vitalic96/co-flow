import { createSlice } from '@reduxjs/toolkit'

type ThemeSliceState = {
  theme: 'light' | 'dark'
}

const initialState = {
  theme: 'light',
} as const

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState satisfies ThemeSliceState as ThemeSliceState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})

export const selectTheme = (state: RootState) => state.theme.theme

export const { toggleTheme } = themeSlice.actions
