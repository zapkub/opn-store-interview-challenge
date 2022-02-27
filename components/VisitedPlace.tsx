import { sortBy } from "lodash"
import { ComponentType, useMemo } from "react"
import { SchemaTypeDefs } from "../apis/types"

type VisitedPlaceComponent = ComponentType<{
    timeline: SchemaTypeDefs.PatientTimelineEntry[]
}>
export const VisitedPlace: VisitedPlaceComponent = ({ timeline }) => {

    const visitedPlace = useMemo(() => {
        const unique = timeline.reduce<string[]>((prev, curr) => {
            if (prev.indexOf(curr.locationName) === -1) {
                prev.push(curr.locationName)
            }
            return prev
        }, [])

        return sortBy(unique, (place) => place);
    }, [timeline])

    return (<div className="VisitedPlace">
        {visitedPlace.map(item => (<div className="VisitedPlace__Item" key={item}>{item}</div>))}
        {!visitedPlace.length && <div>No visited places yet</div>}
    </div>)
}