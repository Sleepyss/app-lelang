<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Detail Member</h1>
          <div class="row">
            <div class="col-lg-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Data Member</h6>
                </div>
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-4 text-center">
                      <i class="far fa-user fa-7x text-gray-300"></i>
                    </div>
                    <div class="col py-2">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        Username
                      </div>
                      <div
                        v-if="level == 'admin' || level == 'petugas'"
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ petugas.username }}
                      </div>
                      <div
                        v-else
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ masyarakat.username }}
                      </div>

                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        Nama
                      </div>
                      <div
                        v-if="level == 'admin' || level == 'petugas'"
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ petugas.nama_petugas }}
                      </div>
                      <div
                        v-else
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ masyarakat.nama_masyarakat }}
                      </div>
                      <div v-if="level == 'admin' || level == 'petugas'">
                        <div
                          class="
                            text-xs
                            font-weight-bold
                            text-primary text-uppercase
                          "
                        >
                          Jenis Kelamin
                        </div>
                        <div
                          class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                        >
                          {{ petugas.jenis_kelamin }}
                        </div>
                      </div>

                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        Alamat
                      </div>
                      <div
                        v-if="level == 'admin' || level == 'petugas'"
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ petugas.alamat }}
                      </div>
                      <div
                        v-else
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ masyarakat.alamat_masyarakat }}
                      </div>
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        No. Telephone
                      </div>
                      <div
                        v-if="level == 'admin' || level == 'petugas'"
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ petugas.tlp_petugas }}
                      </div>
                      <div
                        v-else
                        class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                      >
                        {{ masyarakat.tlp_masyarakat }}
                      </div>
                      <div v-if="level == 'admin' || level == 'petugas'">
                        <div
                          class="
                            text-xs
                            font-weight-bold
                            text-primary text-uppercase
                          "
                        >
                          Level
                        </div>
                        <div
                          class="h6 mb-0 font-weight-bold text-gray-800 mb-2"
                        >
                          {{ petugas.level }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link
                  v-if="level == 'masyarakat'"
                  class="btn btn-info btn-icon-split"
                  :to="{
                    name: 'tambahdetailm',
                    params: { id: this.$route.params.id },
                  }"
                  >Edit Detail</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      masyarakat: {},
      petugas: {},
      level: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    this.level = data.level;

    this.axios
      .get(
        `http://localhost/lelangOn/public/api/user/allid/petugas/${this.$route.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        this.petugas = res.data;
      })
      .catch((err) => console.log(err));

    this.axios
      .get(
        `http://localhost/lelangOn/public/api/user/allid/masyarakat/${this.$route.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        this.masyarakat = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
