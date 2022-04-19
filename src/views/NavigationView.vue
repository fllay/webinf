<template>
  <div class="about" style="height: 100vh">
    <b-container fluid style="height: 100vh">
      <b-row style="height: 100vh">
        <b-col cols="2"
          ><div>Left panel</div>
          <b-row>
            <b-col align-self="start"
              ><b-form-checkbox
                switch
                size="lg"
                @input="updateSLAM"
                v-model="isSLAM"
                :disabled="isNav"
                >SLAM</b-form-checkbox
              ></b-col
            >
            <b-col align-self="start"
              ><b-button
                @click="saveMap"
                variant="outline-primary"
                :disabled="!newMapName"
                >Save Map</b-button
              ></b-col
            ></b-row
          >
          <b-row>
            <b-col
              ><b-form-input
                v-model="newMapName"
                required
                placeholder="Enter Map name"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            <b-col align-v="start"
              ><b-form-checkbox
                switch
                size="lg"
                @input="updatePose"
                v-model="isPose"
                >Pose estimate</b-form-checkbox
              ></b-col
            >
            <b-col align-v="start"
              ><b-button @click="setPose" variant="outline-primary"
                >Set pose</b-button
              ></b-col
            >
          </b-row>
          <b-row>
            <b-col
              ><b-form-checkbox
                switch
                size="lg"
                @input="updateWaypoint"
                v-model="isWaypoint"
                >Pick waypoint</b-form-checkbox
              ></b-col
            >
            <b-col
              ><b-button
                @click="setWaypoint"
                variant="outline-primary"
                :disabled="!newWaypointName"
                >Set waypoint</b-button
              ></b-col
            >
          </b-row>
          <b-row>
            <b-col
              ><b-form-input
                v-model="newWaypointName"
                required
                placeholder="Enter name"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            <b-button @click="calIMU" variant="outline-primary"
              >Cal IMU</b-button
            >
          </b-row>
          <b-row>
            <div class="virtual--gamepad" />
          </b-row>
        </b-col>
        <b-col cols="8"><div id="map3d"></div></b-col>
        <b-col cols="2">
          <b-row>
            <b-col
              ><b-button @click="loadMap" variant="outline-primary"
                >Load Map</b-button
              ></b-col
            >
            <b-col
              ><b-button @click="deleteAMap" variant="danger"
                >Delete Map</b-button
              ></b-col
            >
          </b-row>
          <b-table
            :items="mapNames"
            :fields="mapFields"
            select-mode="single"
            responsive="sm"
            ref="selectableTable"
            selectable
            @row-selected="onRowMapSelected"
          >
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
          <b-row>
            <b-col
              ><b-button @click="deleteAWaypoint" variant="danger"
                >Delete waypoint</b-button
              ></b-col
            >
          </b-row>
          <b-table
            :items="wayPoints"
            :fields="wayPointFields"
            select-mode="single"
            responsive="sm"
            ref="selectableTable"
            selectable
            @row-selected="onRowWayPointSelected"
          >
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
          <b-row>
            <b-col align-self="start"
              ><b-form-checkbox
                switch
                size="lg"
                @input="updateNav"
                v-model="isNav"
                :value="TRUE"
                :unchecked-value="FALSE"
                :disabled="isSLAM"
                >NAV</b-form-checkbox
              >
            </b-col>
            <b-button @click="goToWaypoint" variant="outline-primary"
              >Go</b-button
            >
          </b-row>
          <b-row>
            <div>
              <p>Status : {{ navStatus }}</p>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ROSLIB from "roslib";
import { BButton, BRow, BCol, BContainer, BFormCheckbox } from "bootstrap-vue";
import {
  Viewer,
  LaserScan,
  Pose,
  UrdfClient,
  OccupancyGridClient,
  InteractiveMarkerClient,
  MarkerClient,
  MarkerArrayClient,
  Path,
} from "ros3d";

import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
import nipplejs from "nipplejs";

export default {
  data: function () {
    return {
      rbServer: null,
      colWidth: 0,
      gmap_name: "Choose a map",
      getMap: null,
      getWaypointName: null,
      onMarker: null,
      offMarker: null,
      mapNames: [],
      selectedMap: "",
      mapFields: ["selected", "name"],
      wayPoints: [],
      selectedWayPoint: "",
      wayPointFields: ["selected", "name"],
      isWaypointAvaliable: false,
      deleteMap: null,
      deleteWaypoint: null,
      newWaypointName: "",
      isNav: false,
      TRUE: true,
      FALSE: false,
      startNavSrv: null,
      isSLAM: false,
      isPose: "",
      isWaypoint: "",
      startSLAMsrv: null,
      showPoseMarker: null,
      showNavMarker: null,
      setPoseSrv: null,
      onSlam: null,
      offSlam: null,
      seqWayPoint: 1,
      getPoseSrv: null,
      getWayPoints: null,
      saveMapSrv: null,
      newMapName: "",
      actionClient: null,
      goalCancel: null,
      getPoseWaypointName: null,
      g_pose: null,
      calIMUsrv: null,
      viewer3d: null,
      isServerConnected: false,
      publishImmidiately: true,
      cmdVel: null,
      navStatus: "",
    };
  },
  components: {
    BRow,
    BCol,
    BContainer,
    BButton,
    BFormCheckbox,
    ResizeObserver,
  },
  mounted() {
    const manager = nipplejs.create({
      zone: document.querySelector(".virtual--gamepad"),
      mode: "static",
      position: { left: "50%", top: "80%" },
      color: "#c9c3b2",
      threshold: 0.25,
      fadeTime: 400,
      size: 150,
      maxNumberOfNipples: 1,
    });

    manager.on(
      "move",
      function (evt, nipple) {
        // nipplejs returns direction is screen coordiantes
        // we need to rotate it, that dragging towards screen top will move robot forward
        var direction = nipple.angle.degree - 90;
        if (direction > 180) {
          direction = -(450 - nipple.angle.degree);
        }
        // convert angles to radians and scale linear and angular speed
        // adjust if youwant robot to drvie faster or slower
        var lin = Math.cos(direction / 57.29) * nipple.distance * 0.001;
        var ang = Math.sin(direction / 57.29) * nipple.distance * 0.01;
        // nipplejs is triggering events when joystic moves each pixel
        // we need delay between consecutive messege publications to
        // prevent system from being flooded by messages
        // events triggered earlier than 50ms after last publication will be dropped
        console.log(lin);
        if (this.publishImmidiately == true) {
          this.publishImmidiately = false;
          this.moveAction(lin, ang);
          setTimeout(
            function () {
              this.publishImmidiately = true;
            }.bind(this),
            50
          );
        }
      }.bind(this)
    );
    // event litener for joystick release, always send stop message
    manager.on(
      "end",
      function () {
        this.moveAction(0, 0);
      }.bind(this)
    );
    this.isServerConnected = this.$store.state.serverConnected;
    if (this.$store.state.serverConnected == true) {
      console.log("Start navigayion view");
      this.rbServer = this.getRbServer;
      window.addEventListener("resize", () => {
        this.colWidth = window.innerWidth;
      });

      this.viewer3d = new Viewer({
        divID: "map3d",
        width: (this.colWidth / 12) * 8,
        antialias: true,
      });

      this.viewer3d.resize(
        document.getElementById("map3d").offsetWidth * 0.96,
        ((document.getElementById("map3d").offsetWidth * 3) / 4) * 0.96
      );

      this.cmdVel = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
      this.cmdVel.advertise();

      var tfClient = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "map",
        serverName: "tf2_web_republisher",
      });

      this.getMap = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_map",
        serviceType: "agv_interface/maps",
      });

      this.getWayPoints = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint",
        serviceType: "agv_interface/waypointsarray",
      });

      this.getWaypointName = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint_name",
        serviceType: "agv_interface/waypointname",
      });

      this.getPoseWaypointName = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_a_waypoint",
        serviceType: "agv_interface/awaypoint",
      });

      this.deleteMap = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/delete_map",
        serviceType: "agv_interface/deletemap",
      });

      this.deleteWaypoint = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/delete_waypoint",
        serviceType: "agv_interface/deletewaypoint",
      });

      this.startNavSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/start_navigation",
        serviceType: "agv_interface/navigatesrv",
      });

      this.startSLAMsrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/start_slam",
        serviceType: "agv_interface/slamsrv",
      });

      this.showPoseMarker = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/poseestimate_markers_service",
        serviceType: "agv_interface/poseestimate",
      });

      this.showNavMarker = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/waypoint_markers_service",
        serviceType: "agv_interface/navigatesrv",
      });

      this.setPoseSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/set_pose",
        serviceType: "agv_interface/poseestimate",
      });

      this.getPoseSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_pose",
        serviceType: "agv_interface/getpost",
      });

      this.saveMapSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/save_map",
        serviceType: "agv_interface/savemaps",
      });

      this.calIMUsrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/imu_cal",
        serviceType: "std_srvs/Empty",
      });

      this.onSlam = new ROSLIB.ServiceRequest({
        onezero: 1,
        map_file: "map_office",
      });

      this.offSlam = new ROSLIB.ServiceRequest({
        onezero: 0,
        map_file: "map_office",
      });

      new LaserScan({
        ros: this.rbServer,
        topic: "scan",
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        material: {
          color: 0x880000,
          size: 0.1,
        },
      });

      new Pose({
        ros: this.rbServer,
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        topic: "robot_pose",
      });

      new UrdfClient({
        ros: this.rbServer,
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
      });

      new OccupancyGridClient({
        ros: this.rbServer,
        continuous: true,
        rootObject: this.viewer3d.scene,
      });

      this.onMarker = new ROSLIB.ServiceRequest({
        onezero: 1,
      });

      this.offMarker = new ROSLIB.ServiceRequest({
        onezero: 0,
      });

      var tfClientM = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "/map",
      });

      new InteractiveMarkerClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/simple_marker",
        camera: this.viewer3d.camera,
        rootObject: this.viewer3d.selectableObjects,
      });

      new MarkerClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker",
        camera: this.viewer3d.camera,
        rootObject: this.viewer3d.selectableObjects,
        lifetime: 10,
      });

      new MarkerArrayClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker_array",
        rootObject: this.viewer3d.selectableObjects,
      });

      new MarkerArrayClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker_array_text",
        rootObject: this.viewer3d.selectableObjects,
      });

      this.actionClient = new ROSLIB.ActionClient({
        ros: this.rbServer,
        actionName: "move_base_msgs/MoveBaseAction",
        serverName: "/move_base",
      });

      this.goalCancel = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/move_base/cancel",
        messageType: "actionlib_msgs/GoalID",
      });
      // Register publisher within ROS system
      this.goalCancel.advertise();

      var pathDisplay = new Path({
        ros: this.rbServer,
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        topic: "/move_base_flex/GlobalPlanner/plan",
      });

      this.viewer3d.addObject(pathDisplay);

      var move_base_status_listener = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/move_base/status",
        messageType: "actionlib_msgs/GoalStatusArray",
      });

      move_base_status_listener.subscribe(
        function (message) {
          if (message.status_list.length == 1) {
            //console.log(message.status_list[0].status)
            //console.log(message.status_list[0].goal_id)
            this.goalID = message.status_list[0].goal_id;
            //console.log(nav_statusElement)
            if (message.status_list[0].status == 3) {
              this.navStatus = "Goal react";
            } else if (message.status_list[0].status == 1) {
              this.navStatus = "Driving";
            }
          }
        }.bind(this)
      );
    }

    this.loadMap();
  },
  // Prevent entering page without ROS server connection
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component instance via `vm`
      if (vm.$store.state.serverConnected == true) {
        next();
      } else {
        next("/");
      }
    });
  },
  methods: {
    moveAction(linear, angular) {
      console.log("MOve action");
      var twist = new ROSLIB.Message({
        linear: {
          x: 0,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: 0,
        },
      });

      if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
      } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
      }
      this.cmdVel.publish(twist);
    },
    handleResize({ width, height }) {
      console.log("resized", width, height);
      console.log(document.getElementById("map3d").offsetWidth);
      this.viewer3d.resize(
        document.getElementById("map3d").offsetWidth * 0.96,
        (document.getElementById("map3d").offsetWidth * 0.96 * 3) / 4
      );
    },
    calIMU() {
      var param = new ROSLIB.ServiceRequest({});
      this.calIMUsrv.callService(param, function (result) {
        console.log(result);
      });
    },
    saveMap() {
      var mapName_ = new ROSLIB.ServiceRequest({
        mapfile: this.newMapName,
      });
      console.log(mapName_);
      this.saveMapSrv.callService(mapName_, function (result) {
        console.log(result);
      });
    },
    setPose() {
      this.setPoseSrv.callService(this.onMarker, function (result) {
        console.log(result);
      });
    },
    setWaypoint() {
      console.log("set waypoint");
      console.log(this.selectedMap);
      console.log(this.seqWayPoint);
      var poseReq = new ROSLIB.ServiceRequest({
        name: this.newWaypointName,
        seq: this.seqWayPoint,
        mapname: this.selectedMap,
      });
      console.log(poseReq);
      this.getPoseSrv.callService(
        poseReq,
        function (result) {
          console.log(result);
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
          this.getWaypointName.callService(
            getwaypointparam,
            function (result) {
              console.log(result);
              var dataSet = [];
              while (this.wayPoints.length > 0) {
                this.wayPoints.pop();
              }
              //g_waypoints.push(['none', 'NONE'])

              if (result.length == 0) {
                this.isWaypointAvaliable = false;
              } else {
                this.isWaypointAvaliable = true;
              }
              result.waypointname.forEach((fn) => {
                var item = {
                  name: fn,
                };
                dataSet.push(item);
                this.wayPoints.push(item);
                console.log(fn);
              });

              console.log(dataSet);
            }.bind(this)
          );
          var getwaypointparam2 = new ROSLIB.ServiceRequest({
            name: this.selectedMap,
          });
          this.getWayPoints.callService(getwaypointparam2, function (result) {
            console.log(result);
          });
        }.bind(this)
      );
    },
    goToWaypoint() {
      // create a goal
      console.log("send goal");
      //console.log(pose)
      console.log(this.g_pose);

      var goal = new ROSLIB.Goal({
        actionClient: this.actionClient,
        goalMessage: {
          target_pose: {
            header: {
              frame_id: "map",
            },
            pose: this.g_pose.pose,
          },
        },
      });
      goal.send();

      goal.on("feedback", function (feedback) {
        console.log("Feedback: " + feedback);
      });

      goal.on("result", function (result) {
        console.log("Final Result: " + result);
      });
    },
    updateSLAM() {
      if (this.isSLAM == true) {
        this.startSLAMsrv.callService(this.onSlam, function (result) {
          console.log(result);
        });
        this.$store.commit("setIsSlamRunning", true);
      } else {
        this.startSLAMsrv.callService(this.offSlam, function (result) {
          console.log(result);
        });
        this.$store.commit("setIsSlamRunning", false);
      }
    },
    updatePose() {
      if (this.isPose == true) {
        this.showPoseMarker.callService(this.onMarker, function (result) {
          console.log(result);
        });
      } else {
        this.showPoseMarker.callService(this.offMarker, function (result) {
          console.log(result);
        });
      }
      console.log(this.isPose);
    },
    updateWaypoint() {
      if (this.isWaypoint == true) {
        this.showNavMarker.callService(this.onMarker, function (result) {
          console.log(result);
        });
      } else {
        this.showNavMarker.callService(this.offMarker, function (result) {
          console.log(result);
        });
      }
      console.log(this.isWaypoint);
    },
    updateNav() {
      var check_nav = this.isNav;
      console.log(this.isNav);

      if (check_nav == true) {
        if (this.selectedMap == "") {
          this.$alert("Choose a map first");
          this.isNav = this.FALSE;
          console.log("After dialog");
          console.log(this.isNav);
        } else {
          var onNav_ = new ROSLIB.ServiceRequest({
            onezero: 1,
            map_file: this.selectedMap,
          });

          console.log(onNav_);

          this.startNavSrv.callService(onNav_, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", true);
        }
      } else {
        if (this.selectedMap == "") {
          console.log("NO map name");
        } else {
          var offNav_ = new ROSLIB.ServiceRequest({
            onezero: 0,
            map_file: this.selectedMap,
          });

          console.log(offNav_);

          this.startNavSrv.callService(offNav_, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", false);
        }
      }

      console.log(check_nav);
    },
    loadMap() {
      this.getMap.callService(
        this.onMarker,
        function (result) {
          console.log("Done");
          console.log(result);
          while (this.mapNames.length > 0) {
            this.mapNames.pop();
          }
          result.map_file.forEach((fn) => {
            var item = {
              name: fn,
            };

            this.mapNames.push(item);
            console.log(fn);
          });
        }.bind(this)
      );
    },
    deleteAMap() {
      console.log("Dlete map");
      var delMapParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMap,
      });
      this.deleteMap.callService(
        delMapParam,
        function (result) {
          console.log(result);
          this.loadMap();
        }.bind(this)
      );
    },
    deleteAWaypoint() {
      console.log("Dlete waypoint");
      var delWaypointParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMap,
        waypoint: this.selectedWayPoint,
      });

      this.deleteWaypoint.callService(
        delWaypointParam,
        function (result) {
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
          console.log(result);
          this.getWaypointName.callService(
            getwaypointparam,
            function (result) {
              console.log(result);
              var dataSet = [];
              while (this.wayPoints.length > 0) {
                this.wayPoints.pop();
              }
              //g_waypoints.push(['none', 'NONE'])

              if (result.length == 0) {
                this.isWaypointAvaliable = false;
              } else {
                this.isWaypointAvaliable = true;
              }
              result.waypointname.forEach((fn) => {
                var item = {
                  name: fn,
                };
                dataSet.push(item);
                this.wayPoints.push(item);
                console.log(fn);
              });

              console.log(dataSet);
              //Update table
            }.bind(this)
          );

          var getwaypointparam2 = new ROSLIB.ServiceRequest({
            name: this.selectedMap,
          });

          this.getWayPoints.callService(getwaypointparam2, function (result) {
            console.log(result);
          });
        }.bind(this)
      );
    },
    onRowMapSelected(items) {
      if (items.length > 0) {
        this.selectedMap = items[0].name;
        this.$store.commit("setSelectedMapName", this.selectedMap);
        console.log(this.selectedMap);

        var getwaypointparam = new ROSLIB.ServiceRequest({
          mapname: this.selectedMap,
        });

        this.getWaypointName.callService(
          getwaypointparam,
          function (result) {
            //console.log(result);
            while (this.wayPoints.length > 0) {
              this.wayPoints.pop();
            }
            //g_waypoints.push(['none', 'NONE'])

            if (result.length == 0) {
              this.isWaypointAvaliable = false;
            } else {
              this.isWaypointAvaliable = true;
            }
            result.waypointname.forEach((fn) => {
              var item = {
                name: fn,
              };
              this.wayPoints.push(item);
            });
          }.bind(this)
        );
        console.log("Call getwaypoins");
        var getwaypointparam2 = new ROSLIB.ServiceRequest({
          name: this.selectedMap,
        });
        console.log(getwaypointparam2);
        this.getWayPoints.callService(getwaypointparam2, function (result) {
          console.log("Get resulte");
          console.log(result);
        });
      }
    },
    onRowWayPointSelected(items) {
      if (items.length > 0) {
        this.selectedWayPoint = items[0].name;
        this.$store.commit("setSelectedWayPoint", this.selectedWayPoint);
        var getwaypointparam = new ROSLIB.ServiceRequest({
          name: this.selectedWayPoint,
          mapname: this.selectedMap,
        });

        this.getPoseWaypointName.callService(
          getwaypointparam,
          function (result) {
            this.g_pose = result;
            console.log(result);
          }.bind(this)
        );
        console.log(this.selectedWayPoint);
      }
    },
  },
  computed: {
    ...mapGetters(["getRbServer", "getServerConnected"]),
  },
};
</script>

<style>
/* override Bootstrap's container */
.container-fluid {
  padding-right: 50px;
  padding-left: 50px;
  margin-right: auto;
  margin-left: auto;
}
#app {
  height: 100vh;
}
</style>
