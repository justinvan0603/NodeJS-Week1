class DTOFactory{
    static getStudyDto(name, description, list_tasks){
                return {
                    name: name,
                    description: description,
                    tasks : list_tasks
                };
            }
}
module.exports = DTOFactory;