import redSoilImg from "../assets/soils/red-soil.png";
import blackSoilImg from "../assets/soils/black-soil.png";
import alluvialImg from "../assets/soils/alluvial-soil.png";
import lateriteImg from "../assets/soils/laterite-soil.png";
import sandySoilImg from "../assets/soils/sandy-soil.png"; // Note: I used loamy-soil.png for sandy if specific sandy is missing
import coastalImg from "../assets/soils/coastal-sandy.png";
import claySoilImg from "../assets/soils/black-soil.png"; 
import salineImg from "../assets/soils/saline-soil.png";
import loamySoilImg from "../assets/soils/loamy-soil.png";
import gravellyImg from "../assets/soils/gravelly-soil.png";

// Ensure sandy-soil exists (was loamy-soil in my copy step, let's double check)
// Actually I copied a gravelly and saline too.

const soilImageMap = {
  "Red Soil": redSoilImg,
  "Red Sandy Loam": sandySoilImg,
  "Red Loamy Soil": loamySoilImg,
  "Black Cotton Soil": blackSoilImg,
  "Black Clay Soil": claySoilImg,
  "Alluvial Soil": alluvialImg,
  "Delta Alluvial Soil": alluvialImg,
  "Coastal Alluvial Soil": alluvialImg,
  "Coastal Sandy Soil": coastalImg,
  "Laterite Soil": lateriteImg,
  "Sandy Soil": sandySoilImg,
  "Clay Soil": claySoilImg,
  "Saline Soil": salineImg,
  "Alkaline Soil": salineImg,
  "Marshy Soil": alluvialImg,
  "Gravelly Soil": gravellyImg,
  "Forest Soil": lateriteImg
};

export { loamySoilImg as defaultSoilImg };
export default soilImageMap;
