import { Constant } from '../../symbols/constants/constant';
import { EuclideanCoordinateSystem } from './coordSystem';
import { Point } from './point';

export class PlanarGeometry {
    dimensions: Constant
    system: EuclideanCoordinateSystem
    points: Point[]

    constructor(dimensions: Constant, system: EuclideanCoordinateSystem) {
        this.dimensions = dimensions
        this.system = system
        this.points = []
    }

    // plotPoint(point: Point)
}