/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './style.scss';
import i18next from 'i18next';
import { languageOptions } from '../../constants/languageOptions';
import { getStudentGlobalLanguage } from '../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdminGlobalLanguage,
    getMentorGlobalLanguage
} from '../../redux/actions';
import { getGlobalLanguage } from '../../redux/home/actions';

const LanguageSelectorComp = ({ module }) => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(
        (state) => state?.mentors.mentorLanguage
    );
    const studentLanguage = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const globalLang = useSelector((state) => state?.home.globalLanguage);
    
    const localLang = JSON.parse(localStorage.getItem('s_language'));
    const localMentorLang = JSON.parse(localStorage.getItem('m_language'));
    const [language, setLanguage] = 
   
    useState(
        module === 'student'
          ? (studentLanguage && studentLanguage.name) || (localLang && localLang.name) || globalLang?.name
          : (selectedLanguage && selectedLanguage.name) ||
            (localMentorLang && localMentorLang.name) ||
            globalLang?.name
      );
      useEffect(() => {
        let langToSet;
        if (module === 'mentor' && localMentorLang) {
          langToSet = localMentorLang;
        } else if (module === 'student' && localLang) {
            langToSet = localLang;
        }
    
        if (langToSet && langToSet.code !== i18next.language) {
          i18next.changeLanguage(langToSet.code);
          if (module === 'mentor') {
            dispatch(getMentorGlobalLanguage(langToSet));
          } else {
            dispatch(getStudentGlobalLanguage(langToSet));
          }
        }
      }, [module, dispatch]);
    const handleSelector = (item) => {
       
        let forMentor = null;

        if (item && item.code !== 'en') {
          forMentor = { ...item, code: 'en', name: 'English' };
        }
    
        setLanguage(item.name);
        i18next.changeLanguage(item.code);
        if (module === 'admin') {
            dispatch(getAdminGlobalLanguage(item));

        } else if (module === 'mentor') {
            dispatch(getMentorGlobalLanguage(forMentor));
            if (!localMentorLang || localMentorLang.code !== item.code) {
                localStorage.setItem('m_language', JSON.stringify(item));
            }
        } else if (module === 'general') {
            dispatch(getGlobalLanguage(item));
            dispatch(getStudentGlobalLanguage(item));
            dispatch(getMentorGlobalLanguage(forMentor));
        } else {
            dispatch(getStudentGlobalLanguage(item));
            if (module === 'student') {
                if (!localLang || localLang.code !== item.code) {
                    localStorage.setItem('s_language', JSON.stringify(item));
                }
            }
        }
    };
    return (
        <DropdownButton
            id="language-selector-btn"
            title={
                <span className='m-3'>
                  
                    {(localLang && localLang.name) || language}
                </span>
            }
             drop="down"
        >
            {languageOptions.map((item, i) => {
                return (
                    <Dropdown.Item
                        key={i}
                        href="#/action-1"
                        onClick={() => handleSelector(item)}
                        label="English"
                        style={{fontSize:"16px"}}
                    >
                        <span> {item.name}</span>
                    </Dropdown.Item>
                );
            })}
        </DropdownButton>
    );
};

export default LanguageSelectorComp;
