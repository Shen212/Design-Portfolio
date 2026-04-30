import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, X, Upload, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

const ProjectForm = ({ project, onSave, onCancel, imageLibrary }) => {
  const [form, setForm] = useState(project || { title: '', description: '', full_description: '', tags: [], images: [], order: 0 });
  const [tagInput, setTagInput] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (idx) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== idx) });
  };

  const toggleImage = (url) => {
    const images = form.images || [];
    if (images.includes(url)) {
      setForm({ ...form, images: images.filter(u => u !== url) });
    } else {
      setForm({ ...form, images: [...images, url] });
    }
  };

  const moveImage = (idx, direction) => {
    const newImages = [...form.images];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= newImages.length) return;
    [newImages[idx], newImages[newIdx]] = [newImages[newIdx], newImages[idx]];
    setForm({ ...form, images: newImages });
  };

  const removeImage = (idx) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <Input placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea placeholder="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Textarea placeholder="Full Description (for modal)" value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} rows={4} />
      
      {/* Image Selection Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Project Images</label>
          <Button variant="outline" size="sm" onClick={() => setShowImagePicker(!showImagePicker)}>
            {showImagePicker ? 'Hide Library' : 'Select from Library'}
          </Button>
        </div>
        
        {showImagePicker && (
          <div className="border rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto">
            {imageLibrary.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No images in library. Upload images in the Images tab first.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {imageLibrary.map((img) => (
                  <div 
                    key={img.id} 
                    className={`relative cursor-pointer rounded overflow-hidden border-2 ${(form.images || []).includes(img.url) ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => toggleImage(img.url)}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-16 object-cover" />
                    {(form.images || []).includes(img.url) && (
                      <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(form.images || []).length > 0 && (
          <div className="space-y-2 mt-3">
            <p className="text-xs text-gray-500">Selected images (drag to reorder):</p>
            {form.images.map((url, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <img src={url} alt="" className="w-12 h-12 object-cover rounded" />
                <span className="flex-1 text-xs text-gray-500">{i + 1}.</span>
                <Button variant="ghost" size="icon" onClick={() => moveImage(i, -1)} disabled={i === 0}>
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => moveImage(i, 1)} disabled={i === form.images.length - 1}>
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeImage(i)}>
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
        <Button type="button" onClick={addTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(form.tags || []).map((tag, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            {tag} <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(i)} />
          </span>
        ))}
      </div>
      <Input type="number" placeholder="Display Order" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </div>
    </div>
  );
};

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [form, setForm] = useState(experience || { company: '', role: '', period: '', description: '', order: 0 });

  return (
    <div className="space-y-4">
      <Input placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <Input placeholder="Role/Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <Input placeholder="Period (e.g., Summer 2024)" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
      <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
      <Input type="number" placeholder="Display Order" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)}>Save</Button>
      </div>
    </div>
  );
};

export default function DataManager() {
  const queryClient = useQueryClient();
  const [projectDialog, setProjectDialog] = useState({ open: false, project: null });
  const [experienceDialog, setExperienceDialog] = useState({ open: false, experience: null });
  const [uploading, setUploading] = useState(false);

  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: () => base44.entities.Project.list('order') });
  const { data: experiences = [] } = useQuery({ queryKey: ['experiences'], queryFn: () => base44.entities.Experience.list('order') });
  const { data: imageLibrary = [] } = useQuery({ queryKey: ['imageLibrary'], queryFn: () => base44.entities.ImageLibrary.list() });

  const createProject = useMutation({
    mutationFn: (data) => base44.entities.Project.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['projects']); setProjectDialog({ open: false, project: null }); }
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['projects']); setProjectDialog({ open: false, project: null }); }
  });

  const deleteProject = useMutation({
    mutationFn: (id) => base44.entities.Project.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['projects'])
  });

  const createExperience = useMutation({
    mutationFn: (data) => base44.entities.Experience.create(data),
    onSuccess: () => { queryClient.invalidateQueries(['experiences']); setExperienceDialog({ open: false, experience: null }); }
  });

  const updateExperience = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Experience.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['experiences']); setExperienceDialog({ open: false, experience: null }); }
  });

  const deleteExperience = useMutation({
    mutationFn: (id) => base44.entities.Experience.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['experiences'])
  });

  const createImage = useMutation({
    mutationFn: (data) => base44.entities.ImageLibrary.create(data),
    onSuccess: () => queryClient.invalidateQueries(['imageLibrary'])
  });

  const deleteImage = useMutation({
    mutationFn: (id) => base44.entities.ImageLibrary.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['imageLibrary'])
  });

  const handleSaveProject = (data) => {
    if (projectDialog.project?.id) {
      updateProject.mutate({ id: projectDialog.project.id, data });
    } else {
      createProject.mutate(data);
    }
  };

  const handleSaveExperience = (data) => {
    if (experienceDialog.experience?.id) {
      updateExperience.mutate({ id: experienceDialog.experience.id, data });
    } else {
      createExperience.mutate(data);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setUploading(true);
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await createImage.mutateAsync({ name: file.name, url: file_url });
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Portfolio Data Manager</h1>

        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Image Library ({imageLibrary.length})</h2>
              <div>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="lib-image-upload" />
                <label htmlFor="lib-image-upload">
                  <Button asChild>
                    <span><Upload className="w-4 h-4 mr-2" /> {uploading ? 'Uploading...' : 'Upload Images'}</span>
                  </Button>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imageLibrary.map((img) => (
                <Card key={img.id} className="overflow-hidden group relative">
                  <img src={img.url} alt={img.name} className="w-full h-32 object-cover" />
                  <CardContent className="p-2">
                    <p className="text-xs text-gray-500 truncate">{img.name || 'Unnamed'}</p>
                  </CardContent>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                    onClick={() => deleteImage.mutate(img.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </Card>
              ))}
              {imageLibrary.length === 0 && <p className="text-gray-500 col-span-full text-center py-8">No images uploaded yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
              <Button onClick={() => setProjectDialog({ open: true, project: null })}>
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      {project.images?.[0] && <img src={project.images[0]} alt="" className="w-16 h-12 object-cover rounded" />}
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.description?.slice(0, 60)}...</p>
                        <div className="flex gap-1 mt-1">
                          {(project.tags || []).slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setProjectDialog({ open: true, project })}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteProject.mutate(project.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.length === 0 && <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Experiences ({experiences.length})</h2>
              <Button onClick={() => setExperienceDialog({ open: true, experience: null })}>
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-sm text-gray-600">{exp.role} • {exp.period}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setExperienceDialog({ open: true, experience: exp })}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteExperience.mutate(exp.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {experiences.length === 0 && <p className="text-gray-500 text-center py-8">No experiences yet. Add your first experience!</p>}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={projectDialog.open} onOpenChange={(open) => setProjectDialog({ open, project: null })}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{projectDialog.project ? 'Edit Project' : 'Add Project'}</DialogTitle>
            </DialogHeader>
            <ProjectForm project={projectDialog.project} onSave={handleSaveProject} onCancel={() => setProjectDialog({ open: false, project: null })} imageLibrary={imageLibrary} />
          </DialogContent>
        </Dialog>

        <Dialog open={experienceDialog.open} onOpenChange={(open) => setExperienceDialog({ open, experience: null })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{experienceDialog.experience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
            </DialogHeader>
            <ExperienceForm experience={experienceDialog.experience} onSave={handleSaveExperience} onCancel={() => setExperienceDialog({ open: false, experience: null })} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}