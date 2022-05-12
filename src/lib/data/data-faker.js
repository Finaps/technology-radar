var entries = {
    name: {
        casual: 'country'
    },
    section:{
        value: ['LANGUAGES_AND_FRAMEWORKS','PLATFORMS','INFRASTRUCTURE','TOOLS','DATASTORES_DATAMANAGEMENT']
    },
    status: {
        value: ['ASSESS', 'HOLD', 'TRAIL', 'ADOPT']
    },
    description:{
        faker: 'lorem.words(50)'
    }
};

mocker()
    .schema('entries', entries, 150)
