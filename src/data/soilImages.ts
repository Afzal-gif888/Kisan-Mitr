import redSoil from "../assets/soils/red-soil.png";
import blackSoil from "../assets/soils/black-soil.png";
import alluvialSoil from "../assets/soils/alluvial-soil.png";
import sandySoil from "../assets/soils/sandy-soil.png";
import coastalSandy from "../assets/soils/coastal-sandy.png";
import loamySoil from "../assets/soils/loamy-soil.png";
import lateriteSoil from "../assets/soils/laterite-soil.png";
import salineSoil from "../assets/soils/saline-soil.png";
import gravellySoil from "../assets/soils/gravelly-soil.png";

const soilImages: Record<string, string> = {
  "Red Soil": redSoil,
  "Red Sandy Soil": sandySoil,
  "Red Loam Soil": loamySoil,
  "Deep Red Soil": redSoil,
  "Black Soil": blackSoil,
  "Black Cotton Soil": blackSoil,
  "Medium Black Soil": blackSoil,
  "Alluvial Soil": alluvialSoil,
  "Delta Alluvial Soil": alluvialSoil,
  "Coastal Sandy Soil": coastalSandy,
  "Laterite Soil": lateriteSoil,
  "Saline Soil": salineSoil,
  "Alkaline Soil": salineSoil,
  "Gravelly Soil": gravellySoil,
  "Clay Soil": loamySoil,
  "Silty Soil": loamySoil,
  "Loamy Soil": loamySoil
};

export default soilImages;
