
<template>
  <div class="estudiante-form">
    <h1>{{ estudiante ? 'Editar Estudiante' : 'Crear Estudiante' }}</h1>
    <form @submit.prevent="saveEstudiante">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="form.nombre" required />
      </div>

      <div class="form-group">
        <label for="edad">Edad</label>
        <input id="edad" type="number" v-model="form.edad" required />
      </div>

      <div class="form-group">
        <label for="curso">Curso</label>
        <select id="curso" v-model="form.cursoId" required>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nombre }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ estudiante ? 'Actualizar' : 'Crear' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    estudiante: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        nombre: '',
        edad: '',
        cursoId: ''
      }
    };
  },
  computed: {
    ...mapGetters(['cursos'])
  },
  watch: {
    estudiante: {
      handler(newEstudiante) {
        if (newEstudiante) {
          this.form = { ...newEstudiante };
        } else {
          this.form = { nombre: '', edad: '', cursoId: '' };
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['createEstudiante', 'updateEstudiante']),
    async saveEstudiante() {
      if (this.estudiante) {
        await this.updateEstudiante(this.form);
      } else {
        await this.createEstudiante(this.form);
      }
      this.$emit('saved');
    }
  }

  
};
</script>


<style scoped>

.estudiante-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9  !important;
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

input, select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus, select:focus {
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