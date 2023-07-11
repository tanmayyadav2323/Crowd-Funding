import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true);
                await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
                setIsLoading(false);
                navigate('/');
            } else {
                alert('Provide a valid image URL');
                setForm({ ...form, image: '' });
            }
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-[40px] font-semibold text-white text-center mb-8">Build your Campaign</h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[70%] h-full">
                {isLoading && <div className="text-center mb-4 text-white">Loading...</div>}
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <label htmlFor="name" className="flex text-[22px] mb-[8px] text-white">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px]"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => handleFormFieldChange('name', e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="flex text-[22px] mb-[8px] text-white">
                            Campaign Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px]"
                            placeholder="Write a title"
                            value={form.title}
                            onChange={(e) => handleFormFieldChange('title', e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="flex text-[22px] mb-[8px] text-white">
                            Describe
                        </label>
                        <textarea
                            id="description"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px] h-[200px]"
                            placeholder="Write description"
                            cols="10"
                            value={form.description}
                            onChange={(e) => handleFormFieldChange('description', e)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="target" className="flex text-[22px] mb-[8px] text-white">
                            Goal
                        </label>
                        <input
                            type="text"
                            id="target"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px]"
                            placeholder="ETH 0.50"
                            value={form.target}
                            onChange={(e) => handleFormFieldChange('target', e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="deadline" className="flex text-[22px] mb-[8px] text-white">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px]"
                            value={form.deadline}
                            onChange={(e) => handleFormFieldChange('deadline', e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="flex text-[22px] mb-[8px] text-white">
                            Image
                        </label>
                        <input
                            type="url"
                            id="image"
                            className="w-full border-gray-700 rounded-md p-2 bg-gray-900 text-white text-[22px] mb-[20px]"
                            placeholder="Place image URL of your campaign"
                            value={form.image}
                            onChange={(e) => handleFormFieldChange('image', e)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-purple-500 text-[22px] text-white px-4 py-2 rounded-md mt-[20px]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
