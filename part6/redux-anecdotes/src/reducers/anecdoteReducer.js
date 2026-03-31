import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], // O estado inicial que você já tinha mapeado
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state
        .map(a => a.id !== id ? a : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer