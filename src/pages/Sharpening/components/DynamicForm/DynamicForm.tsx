import {ReactElement} from "react";

export default function DynamicForm(props: any): ReactElement {
    const {name, age} = props.match.params;
    return (
        <div>
            {name}
            {age}
        </div>
    )
}
