import { SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataService } from "../../services/DataService";

type CreateSpaceProps = {
  dataService: DataService;
};

type CustomEvent = {
    target: HTMLInputElement
}

// receives a reference to a backend data service that will take all that is inside this component and send it to the AWS backend service
// return back an ID of the newly created space
export default function CreateSpace({ dataService }: CreateSpaceProps) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [actionResult, setActionResult] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (name && location) {
      const id = await dataService.createSpace(name, location, photo)
      setActionResult(`Created space with id ${id}`);
      setName('');
      setLocation('');
    } else {
      setActionResult('Please provide a name and a location!')
    }


  };

  function setPhotoUrl(event: CustomEvent){
    if (event.target.files && event.target.files[0]) {
        setPhoto(event.target.files[0]);
    }
  }

  // create an url for the photo
  function renderPhoto() {
    if (photo) {
        const localPhotoURL = URL.createObjectURL(photo)
        return <img alt='' src={localPhotoURL} style={{ maxWidth: "200px" }}/>
    }
  }

  //check if user is authorized
  function renderForm(){
    if (!dataService.isAuthorized()) {
      return<NavLink to={"/login"}>Please login</NavLink>
    }
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label><br/>
        <input value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <label>Location:</label><br/>
        <input value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
        <label>Photo:</label><br/>
        <input type="file" onChange={(e) => setPhotoUrl(e)} /><br/>
        {renderPhoto()}<br/>
        <input type="submit" value='Create space'/>
      </form>
    );
  }

  return <div>
    {renderForm()}
    {actionResult? <h3>{actionResult}</h3>: undefined}
  </div>


}