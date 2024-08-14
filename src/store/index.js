import { createStore } from 'vuex';
import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export default createStore({
  state: {
    estudiantes: [],
    cursos: [],
  },
  mutations: {
    SET_ESTUDIANTES(state, estudiantes) {
      state.estudiantes = estudiantes;
    },
    SET_CURSOS(state, cursos) {
      state.cursos = cursos;
    },
    ADD_ESTUDIANTE(state, estudiante) {
      state.estudiantes.push(estudiante);
    },
    UPDATE_ESTUDIANTE(state, updatedEstudiante) {
      const index = state.estudiantes.findIndex(e => e.id === updatedEstudiante.id);
      if (index !== -1) {
        state.estudiantes.splice(index, 1, updatedEstudiante);
      }
    },
    DELETE_ESTUDIANTE(state, id) {
      state.estudiantes = state.estudiantes.filter(est => est.id !== id);
    },
    addCurso(state, curso) {
      state.cursos.push(curso);
    },
    updateCurso(state, updatedCurso) {
      const index = state.cursos.findIndex(curso => curso.id === updatedCurso.id);
      if (index !== -1) {
        state.cursos.splice(index, 1, updatedCurso);
      }
    },
    deleteCurso(state, id) {
      console.log('aaaa', state, id);
      state.cursos = state.cursos.filter(curso => curso.id !== id);
    }
  },
  actions: {
    async fetchEstudiantes({ commit }) {
      const response = await axios.get(`${apiUrl}/estudiantes`);
      commit('SET_ESTUDIANTES', response.data);
    },
    async fetchCursos({ commit }) {
      const response = await axios.get(`${apiUrl}/cursos`);
      commit('SET_CURSOS', response.data);
    },
    async createEstudiante({ commit }, estudiante) {
      const response = await axios.post(`${apiUrl}/estudiantes`, estudiante);
      commit('ADD_ESTUDIANTE', response.data);
    },
    async updateEstudiante({ commit }, estudiante) {
      const response = await axios.put(`${apiUrl}/estudiantes/${estudiante.id}`, estudiante);
      commit('UPDATE_ESTUDIANTE', response.data);
    },
    async deleteEstudianteAction({ commit }, id) {
      await axios.delete(`${apiUrl}/estudiantes/${id}`);
      commit('DELETE_ESTUDIANTE', id);
    },
    async createCurso({ commit }, curso) {
      try {
        const response = await axios.post(`${apiUrl}/cursos`, curso);
        commit('addCurso', response.data);
      } catch (error) {
        console.error('Error creating curso:', error);
      }
    },
    async updateCurso({ commit }, curso) {
      try {
        const response = await axios.put(`${apiUrl}/cursos/${curso.id}`, curso);
        commit('updateCurso', response.data);
      } catch (error) {
        console.error('Error updating curso:', error);
      }
    },
    async deleteCursoAction({ commit }, id) {
      try {
        await axios.delete(`${apiUrl}/cursos/${id}`);
        commit('deleteCurso', id); // Asegúrate de que este nombre coincida con la mutación
      } catch (error) {
        console.error('Error deleting curso:', error);
      }
    },
    async fetchCursoById({ commit }, id) {
      try {
        const response = await axios.get(`${apiUrl}/cursos/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching curso by id:', error);
      }
    }
  },
  getters: {
    estudiantes: state => state.estudiantes,
    cursos: state => state.cursos,
    estudiantesFiltrados: (state) => (query) => {
      return state.estudiantes.filter(est => est.nombre.toLowerCase().includes(query.toLowerCase()));
    },
    estudiantesPorCurso: (state) => (cursoId) => {
      return state.estudiantes.filter(est => est.cursoId === cursoId);
    },
    cursos: state => state.cursos,
    cursoById: (state) => (id) => {
      return state.cursos.find(curso => curso.id === id);
    }
  }
});