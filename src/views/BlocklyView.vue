<template>
  <div class="about">
    <h1>Blockly view</h1>
    <div class="row">
      <div
        id="blocklyArea"
        class="col-8"
        style="height: 80vh; background-color: cyan"
      >
        <div
          id="blocklyDiv"
          ref="blocklyDiv"
          style="width: 100vw; height: 80vh; background-color: blue"
        ></div>
        <xml id="toolbox" ref="toolbox" style="display: none">
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
            <block type="logic_null"></block>
            <block type="logic_ternary"></block>
          </category>
          <category name="Loop" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for">
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <value name="BY">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="controls_forEach"></block>
            <block type="controls_flow_statements"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic">
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="math_single">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">9</field>
                </shadow>
              </value>
            </block>
            <block type="math_trig">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">45</field>
                </shadow>
              </value>
            </block>
            <block type="math_constant"></block>
            <block type="math_number_property">
              <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
            </block>
            <block type="math_round">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">3.1</field>
                </shadow>
              </value>
            </block>
            <block type="math_on_list"></block>
            <block type="math_modulo">
              <value name="DIVIDEND">
                <shadow type="math_number">
                  <field name="NUM">64</field>
                </shadow>
              </value>
              <value name="DIVISOR">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="math_constrain">
              <value name="VALUE">
                <shadow type="math_number">
                  <field name="NUM">50</field>
                </shadow>
              </value>
              <value name="LOW">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="HIGH">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
            <block type="math_random_int">
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
            <block type="math_random_float"></block>
            <block type="math_atan2">
              <value name="X">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="Y">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_append">
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
            <block type="text_length">
              <value name="VALUE">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_isEmpty">
              <value name="VALUE">
                <shadow type="text">
                  <field name="TEXT"></field>
                </shadow>
              </value>
            </block>
            <block type="text_indexOf">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">{textVariable}</field>
                </block>
              </value>
              <value name="FIND">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_charAt">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">{textVariable}</field>
                </block>
              </value>
            </block>
            <block type="text_getSubstring">
              <value name="STRING">
                <block type="variables_get">
                  <field name="VAR">{textVariable}</field>
                </block>
              </value>
            </block>
            <block type="text_changeCase">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_trim">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_print">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_prompt_ext">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
          </category>
          <category name="List" colour="%{BKY_LISTS_HUE}">
            <block type="lists_create_with">
              <mutation items="0"></mutation>
            </block>
            <block type="lists_create_with"></block>
            <block type="lists_repeat">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">5</field>
                </shadow>
              </value>
            </block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">{listVariable}</field>
                </block>
              </value>
            </block>
            <block type="lists_getIndex">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">{listVariable}</field>
                </block>
              </value>
            </block>
            <block type="lists_setIndex">
              <value name="LIST">
                <block type="variables_get">
                  <field name="VAR">{listVariable}</field>
                </block>
              </value>
            </block>
            <block type="lists_getSublist">
              <value name="LIST">
                <block type="variables_get">
                  <field name="VAR">{listVariable}</field>
                </block>
              </value>
            </block>
            <block type="lists_split">
              <value name="DELIM">
                <shadow type="text">
                  <field name="TEXT">,</field>
                </shadow>
              </value>
            </block>
            <block type="lists_sort"></block>
          </category>

          <sep></sep>
          <category
            name="Variables"
            colour="%{BKY_VARIABLES_HUE}"
            custom="VARIABLE"
          ></category>
          <category
            name="Functions"
            colour="%{BKY_PROCEDURES_HUE}"
            custom="PROCEDURE"
          ></category>
          <category name="AGV Control" colour="%{BKY_LISTS_HUE}">
            <block type="agv_init"></block>
            <block type="move_to"></block>
            <!--<block type="move_to_preset"></block>-->
            <block type="rospy_loop"></block>
            <block type="sleep_type"></block>
            <block type="button1"></block>
          </category>
        </xml>
      </div>
      <div class="col-4" style="background-color: red">
        <div class="row">
          <button
            type="button"
            class="btn btn-info btn-lg"
            value="run"
            onclick="runBlockly(this)"
            id="run_blockly"
          >
            RUN
          </button>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#saveBlockyModal"
            id="save_blockly"
          >
            Save
          </button>
        </div>

        <div class="row">
          <button
            type="button"
            class="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#loadBlockyModal"
            onclick="getFile()"
            id="load_blockly"
          >
            Load
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import './prompt';
import Blockly from "blockly";
//const Blockly = () => import("blockly");
//import BlocklyComponent from "../components/BlocklyComponent.vue";
//import "../blocks/agv";
import BlocklyPython from "blockly/python";
//import BlocklyJS from 'blockly/javascript';
export default {
  components: {
    // BlocklyComponent,
  },
  data: function () {
    return {
      blockly_workspace: null,
      options: {
        media: "../assets",
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1,
        },
        scrollbars: true,
        toolbox: null,
        trashcan: true,
      },
    };
  },
  mounted() {

    console.log("MOUNTED");

    this.options.toolbox = document.getElementById("toolbox");

    this.blockly_workspace = Blockly.inject(
      this.$refs["blocklyDiv"],
      this.options
    );
    window.g_blockly_workspace = this.blockly_workspace;

    this.blockly_workspace.addChangeListener(this.myUpdateFunction);

    Blockly.Blocks["agv_init"] = {
      init: function () {
        this.appendDummyInput().appendField("AGV navigation init");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    BlocklyPython["agv_init"] = function (block) {
      // TODO: Assemble JavaScript into code variable.
      console.log(block);
      var code = "import rospy\n";
      code = code + "import actionlib\n";
      code =
        code + "from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal\n";
      code = code + "from std_msgs.msg import String\n";
      code = code + "import json\n";
      code = code + "from tinydb import TinyDB, Query\n";
      code =
        code + "from rospy_message_converter import json_message_converter\n";
      code = code + "import agv\n";
      code = code + "import time\n";
      //code = code + "waypoint_db = TinyDB('/home/pi/db.json')\n"
      code = code + "rospy.init_node('patrol')\n";
      code =
        code +
        "client = actionlib.SimpleActionClient('move_base', MoveBaseAction)\n";
      code = code + "client.wait_for_server()\n";

      return code;
    };

    Blockly.Blocks["move_to"] = {
      init: function () {
        this.appendDummyInput().appendField("Move to ");
        this.appendValueInput("map_name").setCheck("String").appendField("map");
        this.appendValueInput("waypoint")
          .setCheck("String")
          .appendField("waypoint");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    Blockly.Python["move_to"] = function (block) {
      var value_map_name = Blockly.Python.valueToCode(
        block,
        "map_name",
        Blockly.Python.ORDER_ATOMIC
      );
      var value_waypoint = Blockly.Python.valueToCode(
        block,
        "waypoint",
        Blockly.Python.ORDER_ATOMIC
      );
      // TODO: Assemble Python into code variable.
      var code =
        "goal = agv.goal_pose(" +
        value_map_name +
        " , " +
        value_waypoint +
        ")\n";
      code = code + "client.send_goal(goal)\n";
      code = code + "client.wait_for_result()\n";
      return code;
    };

    Blockly.Blocks["sleep_type"] = {
      init: function () {
        this.appendDummyInput().appendField("Sleep for");
        this.appendValueInput("NAME").setCheck("Number");
        this.appendDummyInput().appendField("sec");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    Blockly.Python["sleep_type"] = function (block) {
      var value_name = Blockly.Python.valueToCode(
        block,
        "NAME",
        Blockly.Python.ORDER_ATOMIC
      );
      // TODO: Assemble JavaScript into code variable.
      var code = "time.sleep(" + value_name + ")\n";
      return code;
    };

    Blockly.Blocks["move_to_preset"] = {
      init: function () {
        this.appendDummyInput().appendField("Move to ");

        this.appendDummyInput().appendField(
          this.$store.state.selectedMapName + " "
        );

        this.appendDummyInput()
          .appendField("waypoint")
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            "WAYPOINT"
          );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },

      generateOptions: function () {
        var options = [];
        var g_waypoints = this.$store.state.selectedWayPoints;
        for (var i = 0; i < g_waypoints.length; i++) {
          options.push([g_waypoints[i].name, g_waypoints[i].name]);
        }
        return options;
      },
    };

    Blockly.Python["move_to_preset"] = function (block) {
      /*var value_waypoint = Blockly.Python.valueToCode(block, 'waypoint', Blockly.Python
                  .ORDER_ATOMIC);*/

      var value_waypoint = block.getFieldValue("WAYPOINT");
      // TODO: Assemble Python into code variable.
      var code =
        'goal = agv.goal_pose("' +
        this.$store.state.selectedMapName +
        '" , "' +
        value_waypoint +
        '")\n';
      code = code + "client.send_goal(goal)\n";
      code = code + "client.wait_for_result()\n";
      return code;
    };

    Blockly.Blocks["rospy_loop"] = {
      init: function () {
        this.appendDummyInput().appendField("ROS FOEVER LOOP");
        this.appendStatementInput("DO")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    Blockly.Python["rospy_loop"] = function (block) {
      //var statements_name = Blockly.Python.statementToCode(block, "NAME");
      // TODO: Assemble Python into code variable.
      var branch = Blockly.Python.statementToCode(block, "DO");
      branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;

      var code = "while not rospy.is_shutdown():\n" + branch;
      return code;
    };

    Blockly.Blocks["button1"] = {
      init: function () {
        this.appendDummyInput().appendField("Button 1");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };

    Blockly.Python["button1"] = function (block) {
      console.log(block);
      var code = "rospy.wait_for_message('/io1', String, timeout=None).data";
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };
  },
  methods: {
    myUpdateFunction(event) {
      var code = Blockly.Python.workspaceToCode(this.blockly_workspace);
      //document.getElementById("codeGenerated").value = code;
      console.log(event);
      console.log(code);
    },
  },
};
</script>
