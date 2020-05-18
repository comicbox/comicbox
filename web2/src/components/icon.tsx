import { FunctionalComponent, h } from "preact";
import { IconName } from "./icon-type";

export const Icon: FunctionalComponent<{ class?: string, name: IconName }> = props => {
    return <span class={`material-icons ${props.class}`}>{props.name}</span>
}