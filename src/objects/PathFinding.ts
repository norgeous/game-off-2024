import { navMesh } from "./map/TiledMapBuilder";
import { Point } from "navmesh";

export type DebugConfig = {
  showPath: boolean
  drawNavmesh?: boolean
  drawCentroid?: boolean,
  drawBounds?: boolean, 
  drawNeighbors?: boolean,
  drawPortals?: boolean
  pathColour?: number 
}

class PathFinding {
  public path: Point[];
  public currentTarget: Point;
  public pathComplete: boolean = true;

  createPath(from: Point, to: Point, debug: boolean = false, debugConfig: DebugConfig = {showPath: true, drawNavmesh: false}) {
    if (!navMesh) return;
    this.path = navMesh.findPath(from, to);
    if (debug) this.debugPath(debugConfig);
    this.setCurrentTarget();
    this.pathComplete = false;
    return this.currentTarget;
  } 
  
  private setCurrentTarget() 
  {
    if (this.path && this.path.length > 0) this.currentTarget = this.path.shift() ?? {x:0, y:0}; 
    else this.pathComplete = true;
  }

  getNearestPoint(x: number, y: number, distanceForNextPoint: number = 5) {
    if (this.currentTarget) {
      const distance = Phaser.Math.Distance.Between(x, y, this.currentTarget.x, this.currentTarget.y);
      if (distance < distanceForNextPoint) {
        this.setCurrentTarget();
      }
    }   
    return this.currentTarget;
  }

  private debugPath (debugConfig: DebugConfig) {
    navMesh.enableDebug(); 
    navMesh.debugDrawClear(); 
    if (debugConfig.drawNavmesh) {
      navMesh.debugDrawMesh({
        drawCentroid: debugConfig.drawCentroid ?? false,
        drawBounds: debugConfig.drawBounds ?? false,
        drawNeighbors: debugConfig.drawNeighbors ?? false,
        drawPortals: debugConfig.drawPortals ?? false
      });
    }
    if (debugConfig.showPath) {
      navMesh.debugDrawPath(this.path, debugConfig.pathColour ?? 0xffd900);
    }
  }
}

export default PathFinding; 



  




