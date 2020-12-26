import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MotionSensorIcon extends Icon {


  pug() {
    return require("./motionSensor.pug").default
  }
}

declareComponent("motion-sensor-icon", MotionSensorIcon)
