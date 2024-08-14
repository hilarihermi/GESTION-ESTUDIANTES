<template>
  <div class="curso-list">
    <h1>Lista de Cursos</h1>

    <button class="btn btn-success" @click="showModal = true">Crear Nuevo Curso</button>

    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.descripcion }}</td>
          <td>
            <button class="btn btn-primary" @click="editCurso(curso.id)">Editar</button>
            <button class="btn btn-danger" @click="deleteCurso(curso.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :visible="showModal" @close="showModal = false">
      <CursoForm :cursoId="editingCursoId" @saved="fetchCursos; showModal = false" />
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal.vue';
import CursoForm from './CursoForm.vue';

export default {
  components: {
    Modal,
    CursoForm
  },
  data() {
    return {
      showModal: false,
      editingCursoId: null
    };
  },
  computed: {
    ...mapGetters(['cursos'])
  },
  methods: {
    ...mapActions(['fetchCursos', 'deleteCursoAction']),
    editCurso(id) {
      this.editingCursoId = id;
      this.showModal = true;
    },
    async deleteCurso(id) {
      if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
        try {
          await this.deleteCursoAction(id);  
           this.fetchCursos();
         
        } catch (error) {
          console.error('Error al eliminar el curso:', error);
        }
      }
    },

    showToast(message, type) {
            this.$toast.show(message, type);
        }
  },
  mounted() {
    this.fetchCursos();
  }
};
</script>

<style scoped>
.curso-list {
  max-width: 800px;
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