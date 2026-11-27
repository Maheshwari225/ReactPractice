export default function Employee(props) {
    return (
        <div style={{textAlign: "center", backgroundColor: "lightsalmon"}}>
            <h4>Employee Details</h4>
            <p>Department: {props.department}</p>
            <p>Salary: {props.salary}</p>
        </div>
    )
}