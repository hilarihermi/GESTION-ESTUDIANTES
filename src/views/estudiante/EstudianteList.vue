<template>
  <div class="estudiante-list">
    <h1>Lista de Estudiantes</h1>

    <div class="search-filter">
      <input class="search-input" v-model="searchQuery" placeholder="Buscar por nombre" />
      <select class="filter-select" v-model="selectedCursoId">
        <option value="">Todos los Cursos</option>
        <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
          {{ curso.nombre }}
        </option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Curso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in estudiantesFiltrados" :key="estudiante.id">
          <td>{{ estudiante.nombre }}</td>
          <td>{{ estudiante.edad }}</td>
          <td>{{ getCursoNombre(estudiante.cursoId) }}</td>
          <td>
            <button class="btn btn-primary" @click="openEditModal(estudiante)">Editar</button>
            <button class="btn btn-danger" @click="deleteEstudiante(estudiante.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn-success" @click="openCreateModal">Crear Nuevo Estudiante</button>

    <Modal :visible="showModal" @close="closeModal">
      <EstudianteForm :estudiante="selectedEstudiante" @saved="fetchEstudiantes; closeModal()" />
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal.vue';
import EstudianteForm from './EstudianteForm.vue';

export default {
  components: {
    Modal,
    EstudianteForm
  },
  data() {
    return {
      showModal: false,
      searchQuery: '',
      selectedCursoId: '',
      selectedEstudiante: null
    };
  },
  computed: {
    ...mapGetters(['estudiantes', 'cursos', 'estudiantesPorCurso']),
    estudiantesFiltrados() {
      let estudiantes = this.estudiantes;
      if (this.selectedCursoId) {
        estudiantes = this.estudiantesPorCurso(this.selectedCursoId);
      }
      return estudiantes.filter(est => est.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    ...mapActions(['fetchEstudiantes', 'fetchCursos', 'deleteEstudianteAction']),
    getCursoNombre(cursoId) {
      const curso = this.cursos.find(curso => curso.id === cursoId);
      return curso ? curso.nombre : 'Desconocido';
    },
    openEditModal(estudiante) {
      this.selectedEstudiante = estudiante;
      this.showModal = true;
    },
    openCreateModal() {
      this.selectedEstudiante = null;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteEstudiante(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
        await this.deleteEstudianteAction(id);
        this.fetchEstudiantes();
      }
    }
  },
  mounted() {
    this.fetchEstudiantes();
    this.fetchCursos(); 
  }
};
</script>

<style scoped>
.estudiante-list {
  max-width: 900px;
  margin: auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.filter-select {
  flex: 0.5;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th, .table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #42b983;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  display: block;
  margin: 20px auto 0;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
}

.btn-success:hover {
  background-color: #218838;
}
</style>