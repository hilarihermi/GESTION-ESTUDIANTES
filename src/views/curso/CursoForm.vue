<template>
  <div class="curso-form">
    <h1>{{ isEdit ? 'Editar Curso' : 'Crear Curso' }}</h1>
    <form @submit.prevent="saveCurso">
      <div class="form-group">
        <label for="nombre">Nombre del Curso</label>
        <input id="nombre" v-model="curso.nombre" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="curso.descripcion" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEdit ? 'Actualizar' : 'Crear' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    cursoId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      curso: {
        nombre: '',
        descripcion: ''
      },
      isEdit: false
    };
  },
  watch: {
    cursoId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadCurso();
        }
      }
    }
  },
  methods: {
    ...mapActions(['createCurso', 'updateCurso', 'fetchCursoById']),
    async saveCurso() {
      if (this.isEdit) {
        await this.updateCurso(this.curso);
      } else {
        await this.createCurso(this.curso);
      }
      this.$emit('saved');
    },
    async loadCurso() {
      if (this.cursoId) {
        this.curso = await this.fetchCursoById(this.cursoId);
        this.isEdit = true;
      } else {
        this.curso = {
          nombre: '',
          descripcion: ''
        };
        this.isEdit = false;
      }
    }
  }
};
</script>

<style scoped>
.curso-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus, textarea:focus {
  border-color: #42b983;
  outline: none;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.btn:hover {
  background-color: #369d76;
}
</style>