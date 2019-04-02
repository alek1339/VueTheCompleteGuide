<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h1>Http</h1>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" v-model="user.email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="user.password">
        </div>
        <button class="btn btn-primary" @click="submit">Submit</button>
        <hr>
        <button class="btn btn-primary" @click="fetchData">Get data</button>
        <ul class="list-group">
          <li class="list-group-item" v-for="a in animals">{{ a.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      animals: []
    };
  },
  methods: {
    submit() {
      this.$http.post("http://localhost:5000/users/login", this.user).then(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
    },
    fetchData() {
      this.$http
        .get("http://localhost:5000/animals/getAnimals")
        .then(res => {
          return res.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          console.log(resultArray);
          this.animals = resultArray;
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
