import axios, { AxiosResponse } from 'axios';
import { changeValue } from '../store/rerenderSlice';

export const fetchDataMainBlocks = async (setCardList: React.Dispatch<React.SetStateAction<any[]>>, setWait: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    const response = await axios.get('http://localhost:8000/users/main-blocks');

    if (response.status !== 200) {
      throw new Error('Network Error');
    }

    const data = response.data;
    setCardList(data);
    setWait(true);
  } catch (error) {
    console.log('Some error:', error);
  }
};

export const fetchMainUpdateCard = async (currentToDoId: any, cardId: string, setCardList: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await axios.patch(`http://localhost:8000/users/main-blocks/${currentToDoId}/${cardId}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      setCardList(data);
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusPost = async (currentToDoId: any, cardId: string, dispatch: React.Dispatch<any>) => {
  try {
    const response = await fetch(`http://localhost:8000/users/posts/${currentToDoId}/${cardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(changeValue());
    } else {
      throw new Error('Network Error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryPosts = async (index: number, setCategoryPosts: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await fetch(`http://localhost:8000/users/post-category/${index}`, { method: 'GET' });
    const data = await response.json();
    setCategoryPosts(data);
  } catch (error) {
    console.log(error);
  }
};

export const addOneToDoFetch = async (newTodo: Record<string, string | number>, status: string, dispatch: React.Dispatch<any>) => {
  try {
    const response = await axios.post('http://localhost:8000/users/create-post/', {
      ...newTodo,
      stat: status,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      dispatch(changeValue());
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
}

export const editOneTodoFetch = async (newTodo: Record<string, string | number>, id: number, dispatch: React.Dispatch<any>) => {
  try {
    const response = await axios.patch(`http://localhost:8000/users/create-post/${id}`, {
      ...newTodo
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      dispatch(changeValue());
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const addOneTodoArea = async (currentToDoId: any, stat: string, dispatch: React.Dispatch<any>) => {
  try {
    const response = await axios.patch(`http://localhost:8000/users/posts-area/${currentToDoId}/${stat}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      dispatch(changeValue());
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
};


export const deleteCategoryFetch = async (stat: any) => {
  try {
    const response = await axios.delete(`http://localhost:8000/users/main-blocks/${stat}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      // Выполнение дополнительных действий после успешного удаления категории
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCategoryFetch = async (category: string) => {
  try {
    const response = await axios.post(`http://localhost:8000/users/main-blocks/${category}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteOneTodo = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    const response = await axios.delete(`http://localhost:8000/users/post/${id}/`);

    if (response.status === 200) {
      dispatch(changeValue());
    } else {
      console.log('mistake');
    }
  } catch (error) {
    console.error('some error:', error);
  }
};