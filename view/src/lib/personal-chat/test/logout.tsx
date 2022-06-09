import {Inertia} from "@inertiajs/inertia";


export const Logout = () => {

  const onClick = () => Inertia.post('/logout')
  return (
    <div onClick={onClick}>
      <button>
        Logout
      </button>
    </div>
  );
};
