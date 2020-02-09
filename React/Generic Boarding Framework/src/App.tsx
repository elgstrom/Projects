import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FunctionComponent } from 'react';


const meJASON = [
  { namn: "Aktivitet 1", beskrivning: "Gör saker då" },
  { namn: "Aktivitet 2" },
  { namn: "Aktivitet 3" },
  { namn: "Aktivitet 4" },
  { namn: "Aktivitet 5" },
  { namn: "Aktivitet 6" },

]
class App extends React.Component {
  constructor(props: Object) {
    console.log(props);
    super(props);

  }
  render() {
    return (
        <Container >
          <Row>
            <Col>
              <Button onClick={() => addActivity()}>Add</Button>
              <h2>Process: Anställning</h2>
              <CreateNewActivityCard></CreateNewActivityCard>
            </Col>
          </Row>
          <CreateActivity />
          <CardContainer />
        </Container>
    );
  }
}

function addActivity() {
  let act:Activity = new Activity({});
  let np = document.createElement("div");
  ReactDOM.render(<Activity />, np);
  let target = document.getElementById("con1");
  if (target != null) {
    target.append(np);
  }
}

type ac_form = {
  ac_name: string,
  texter: string
};

interface MyObjLayout {
  target: string;
}
class CreateActivity extends React.Component {
  state: ac_form = { ac_name: "", texter: "" };
  constructor(props: Object) {
    super(props);

    //well hmmmm.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event:React.SyntheticEvent<HTMLInputElement> ) { 
    const target = event.currentTarget;
    
    const value = target.type === 'checkbox' ? target.checked as unknown : target.value;
    const name = target.name; 
    this.setState({
      [name]: value
    });
    console.log(this.state);

  }
  handleSubmit(event: Event) {
    event.preventDefault();
    console.log(this);
  }
  render() {
    return (
      <Card bg="light" style={{ margin: '2em' }}>
        <Form>
          <Card.Header as="h5">
            <Form.Control type="text" placeholder="Activity name" name="ac_name" value={this.state.ac_name} onChange={console.log} />

          </Card.Header>
          <Card.Body>
            {/* */}

            <Form.Control type="text" placeholder="Sak att göra" value={this.state.texter} onChange={console.log}/>
          </Card.Body>
          <Button variant="primary" type="submit" onClick={() => {

          }}>
            Save
          </Button>
        </Form>
      </Card>
    );
  }
}



const CardContainer: React.FC = () =>
  <Container id="con1">
    <Row>
      <Col>
        {meJASON.map((object, i) => <ActivityCard id={object.namn} title={object.namn} paragraph={object.beskrivning} />)}
      </Col>
    </Row>
  </Container>



const ButtonsShowcase: React.FC = () => <div className="p-1">
  <Button variant="primary" className="mr-1">Primary</Button>
  <Button variant="secondary" className="mr-1">Secondary</Button>
  <Button variant="success" className="mr-1">Success</Button>
  <Button variant="warning" className="mr-1">Warning</Button>
  <Button variant="danger" className="mr-1">Danger</Button>
  <Button variant="info" className="mr-1">Info</Button>
  <Button variant="light" className="mr-1">Light</Button>
  <Button variant="dark" className="mr-1">Dark</Button>
  <Button variant="link" className="mr-1">Linask</Button>
</div>

type CardProps = {
  title: string,
  id: string,
  paragraph?: string
}

const ActivityCard: FunctionComponent<CardProps> = ({ title, paragraph, id }: CardProps) =>
  <Card bg="light" style={{ margin: '2em' }}>
    <Card.Header as="h5">{title} <Form style={{ float: 'right' }}>
      <Form.Check
        type="switch"
        id={`Checkbox_${id}`}
        label=""
      />
    </Form>
    </Card.Header>
    <Card.Body>
      {/* <Card.Title>Light Card Title</Card.Title> */}
      <Card.Text>
        {paragraph}
      </Card.Text>
    </Card.Body>
  </Card>


const CreateNewActivityCard: FunctionComponent = () =>
  <Card bg="light" style={{ margin: '2em' }}>
    <Form>
      <Card.Header as="h5">
        <Form.Control placeholder="Activity name" />

      </Card.Header>
      <Card.Body>
        {/* <Card.Title>Light Card Title</Card.Title> */}

        <Form.Control placeholder="Sak att göra" />
        <Button style={{ margin: '0.5em', float: 'right' }} variant="primary">Add Item</Button>
      </Card.Body>
    </Form>
  </Card>

class Activity extends React.Component {
  texters: string = "asd";
  header: string = "defheader";

  constructor(props: Object, header?: string, texters?: string) {
    super(props);
    if (header != undefined)
      this.header = header;
    if (texters != undefined)
      this.texters = texters;
  }
  public set(header: string, texters: string) {
    this.header = header;
    this.texters = texters;
  }
  render() {
    return (
      <ActivityCard id={this.header} title={this.header} paragraph={this.texters} />
    )
  }
}

export default App;
