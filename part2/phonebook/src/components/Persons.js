import React from 'react';

const Name = ({person, deleteClick}) => {
    return (
    <div className='person'>
        {person.name} 
        {person.number} 
        <button onClick={() => deleteClick(person.id)}>delete</button>
    </div>
    )}

// const Persons = ({persons, deleteClick}) => {
//     return (
//     <div>
//         {persons.map(
//             person => 
//             <div>
//                 {person.name} 
//                 {person.number} 
//                 <button onClick={deleteClick}>delete</button>
//             </div>
//             )
//         }
//         </div>
//     )
// }

export default Name;