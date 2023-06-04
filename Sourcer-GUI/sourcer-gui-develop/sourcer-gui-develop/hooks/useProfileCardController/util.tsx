import { hideProfile, saveProfile, unHideProfile, unSaveProfile } from '../../api';
import { ICard } from '../../pages/api/profiles/getProfiles/types';

// hiding and unhiding the candidates profile card
const handleHideUnHide = async ({ buttonName, token, ...rest }: ICard & { buttonName: string; token: string }) => {
  let data: string | null = '';
  const { id, location, name } = rest;

  if (buttonName.toLowerCase() === 'hide') {
    data = await hideProfile({
      first_name: name.first_name,
      id,
      json: rest,
      last_name: name.last_name || '',
      location,
      token,
    });
  }

  if (buttonName.toLowerCase() === 'unhide') {
    data = await unHideProfile({ id, token });
  }

  return data;
};

// saving and unsaving the candidates profile card
const handleSaveUnSave = async ({ token, ...rest }: ICard & { token: string }) => {
  let data: string | null = '';
  const { id, location, name, saved } = rest;

  if (!saved) {
    data = await saveProfile({
      first_name: name.first_name,
      id,
      json: rest,
      last_name: name.last_name || '',
      location,
      token,
    });
  } else {
    data = await unSaveProfile({ id, token });
  }

  return data;
};

export { handleHideUnHide, handleSaveUnSave };
