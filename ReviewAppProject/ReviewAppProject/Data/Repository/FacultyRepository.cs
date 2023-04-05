using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using System;

namespace ReviewAppProject.Data.Repository
{
    public class FacultyRepository : IFacultyRepository
    {
        private readonly AppDbContext _context;

        public FacultyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _context.Faculties
                .OrderBy(f => f.FacultyId).AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId) {
            var faculties = _context.Faculties
                .Where(f => f.UniversityId == universityId)
                .OrderBy(f => f.FacultyId)
                .AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async Task<Faculty> GetFacultyByIdAsync(int facultyId)
        {
            return await _context.Faculties
                .Where(f => f.FacultyId.Equals(facultyId))
                .Include(f => f.University)
                .Include(f => f.Courses)
                .Include(f => f.Professors)
                .FirstOrDefaultAsync()
                ?? throw new FacultyNotFoundException();

        }
        
        public async Task<Faculty> GetFacultyByUniversityIdAndNameAsync(int universityId, string facultyName)
        {
            return await _context.Faculties
                .Where(f => f.UniversityId == universityId)
                .Where(f => f.FacultyName.Equals(facultyName))
                .FirstOrDefaultAsync()
                ?? throw new FacultyNotFoundException();

        }

        public async Task<bool> CreateFacultyAsync(FacultyCreateModel model)
        {
            Faculty faculty;
            try
            {
                faculty = await GetFacultyByUniversityIdAndNameAsync(model.UniversityId, model.FacultyName);
                if (faculty != null) throw new FacultyWithNameExistsException();
                return false;
            }
            catch (FacultyNotFoundException)
            {
                faculty = new Faculty
                {
                    UniversityId= model.UniversityId,
                    FacultyName= model.FacultyName,
                    Description = model.Description
                };

                await _context.Faculties.AddAsync(faculty);
                await _context.SaveChangesAsync();

                return true;
            }

        }
        public async Task UpdateFacultyAsync(int id, FacultyCreateModel model)
        {
            var faculty = await GetFacultyByIdAsync(id);

            faculty.FacultyName = model.FacultyName;
            faculty.Description = model.Description;

            _context.Faculties.Attach(faculty);
            _context.Entry(faculty).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFacultyAsync(int id) {
            var faculty = await GetFacultyByIdAsync(id);

            _context.Faculties.Remove(faculty);
            await _context.SaveChangesAsync();
        }
    }
}
