<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/eru.png" />
    <p> </p>
    <b-container class="bv-example-row">
      <b-row>
        <b-col
          ><b-form-input
            v-model="ROSIP"
            placeholder="Enter ROS IP"
          ></b-form-input
        ></b-col>
        <b-col
          ><b-button @click="connectToRos" variant="outline-primary">{{
            rosConnected
          }}</b-button></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import ROSLIB from "roslib";
import { BFormInput, BButton, BRow, BCol, BContainer } from "bootstrap-vue";

export default {
  name: "HomeView",
  components: {
    BFormInput,
    BButton,
    BRow,
    BCol,
    BContainer,
  },
  data: function () {
    return {
      rbServer: null,
      ROSIP: "",
      connected: "",
      isConnected: false,
    };
  },
  mounted() {
    console.log("Start roslibjs");
    // eslint-disable-next-line no-undef
    this.rbServer = new ROSLIB.Ros();
    this.rbServer.on("error", function (error) {
      this.connected = "Connection error" + error;
      console.log("Connection error");
    });

    this.rbServer.on(
      "close",
      function () {
        this.connected = "Disconnected event";
        this.isConnected = false;
        this.$store.commit("setServerConnected", false);
        console.log("Connection closed");
      }.bind(this)
    );

    this.rbServer.on(
      "connection",
      function () {
        console.log("Connected to ROS");
        this.connected = "Connected";
        this.isConnected = true;
        console.log(this.rbServer);
        this.$store.commit("setRbServer", this.rbServer);
        this.$store.commit("setServerConnected", true);
        this.$store.commit("setRosIP", this.ROSIP);
        console.log(this.getRbServer);
      }.bind(this)
    );
  },
  methods: {
    connectToRos() {
      if (this.$store.state.serverConnected == true) {
        if(this.$store.state.isNavRunning == false && this.$store.state.isSlamRunning == false ) {
          this.rbServer.close();
        } else {
          this.$alert("Turn off either navigation or SLAM first");
        }
      } else {
        console.log("Connecting to ROS");
        this.rbServer.connect("ws://" + this.ROSIP + ":9090");
      }
    },
  },
  computed: {
    ...mapGetters(["getRbServer", "getServerConnected", "getRosIP"]),
    rosConnected: function () {
      if (this.$store.state.serverConnected == true) {
        return "Disconnect";
      } else {
        return "Connect";
      }
    },
  },
};
</script>
